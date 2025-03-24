import dayjs, { Dayjs } from 'dayjs'
import type { Coordinates, Destination, Weather } from '../models'
import { WeatherOpenMeteo } from '../models/Weather/WeatherOpenMeteo'

export class WeatherService {
	static getWeather = async (destination: Destination) => {
		const now = dayjs()
		let startDate = dayjs(destination.startDate)
		let endDate = dayjs(destination.endDate)
		if (endDate.format('MMDD') > now.format('MMDD')) {
			endDate = endDate.year(now.year() - 1)
		} else {
			endDate = endDate.year(now.year())
		}
		if (startDate.format('MMDD') > now.format('MMDD')) {
			startDate = startDate.year(now.year() - 1)
		} else {
			startDate = startDate.year(now.year())
		}

		const weatherPromises: Promise<WeatherOpenMeteo>[] = []
		const yearsForAvg = 3
		for (let i = 0; i < yearsForAvg; i++) {
			const promise = this.getWeatherFromOpenMeteo(
				startDate.subtract(i, 'year'),
				endDate.subtract(i, 'year'),
				destination.place.coordinates
			)
			weatherPromises.push(promise)
		}
		const weathers = await Promise.all(weatherPromises)
		const latestWeather = weathers.find(
			(w) => w.daily.time[0] === startDate.format('YYYY-MM-DD')
		)

		const weather: Weather = {
			sunrise: this.getMeanTime(weathers.map((w) => w.daily.sunrise).flat()),
			sunset: this.getMeanTime(weathers.map((w) => w.daily.sunset).flat()),
			avg: {
				maxTemp: this.getMedian(
					weathers.map((w) => w.daily.temperature_2m_max).flat()
				),
				minTemp: this.getMedian(
					weathers.map((w) => w.daily.temperature_2m_min).flat()
				),
				wind: this.getMedian(
					weathers.map((w) => w.daily.wind_speed_10m_max).flat()
				),
				rain: this.getMedian(
					weathers.map((w) => w.daily.precipitation_sum).flat()
				),
			},
			lastYear: {},
		}
		latestWeather.hourly.time.forEach((t, index) => {
			weather.lastYear[t.replace('T', ' ')] = {
				temp: latestWeather.hourly.temperature_2m[index],
				rain: latestWeather.hourly.precipitation[index],
			}
		})
		return weather
	}
	static getWeatherFromOpenMeteo = async (
		startDate: Dayjs,
		endDate: Dayjs,
		coordinates: Coordinates
	) => {
		let url = 'https://archive-api.open-meteo.com/v1/archive?'
		url += `latitude=${coordinates.lat}&longitude=${coordinates.lng}`
		url += `&start_date=${startDate.format('YYYY-MM-DD')}`
		url += `&end_date=${endDate.format('YYYY-MM-DD')}`
		url +=
			'&daily=temperature_2m_max,temperature_2m_min,sunset,sunrise,wind_speed_10m_max,precipitation_sum'
		url += '&hourly=temperature_2m,precipitation'
		url += '&timezone=auto&temporal_resolution=hourly_3'
		try {
			const weatherResponse = await fetch(url)
			const weather = (await weatherResponse.json()) as WeatherOpenMeteo
			const utcOffset = weather.utc_offset_seconds / 60
			const timezone = weather.timezone
			// Adjust sunrise and sunset for correct timezone at the date
			weather.daily.sunrise = weather.daily.sunrise.map((t) => 
				dayjs(t).utcOffset(utcOffset, true).tz(timezone).format('YYYY-MM-DDTHH:mm')
			)
			weather.daily.sunset = weather.daily.sunset.map((t) =>
				dayjs(t).utcOffset(utcOffset, true).tz(timezone).format('YYYY-MM-DDTHH:mm')
			)
			return weather
		} catch (e) {
			console.error(e)
		}
	}

	private static getMedian = (data: number[]) => {
		const sortedData = data.sort((a, b) => a - b)
		const mid = Math.floor(sortedData.length / 2)

		return sortedData.length % 2 === 0
			? (sortedData[mid - 1] + sortedData[mid]) / 2
			: sortedData[mid]
	}

	private static getMeanTime(timeArray: string[]) {
		const totalMinutes = timeArray
			.map((t) => dayjs(t).hour() * 60 + dayjs(t).minute())
			.reduce((sum, minutes) => sum + minutes, 0)

		const meanMinutes = Math.round(totalMinutes / timeArray.length)
		return dayjs()
			.hour(Math.floor(meanMinutes / 60))
			.minute(meanMinutes % 60)
			.format('HH:mm')
	}
}
