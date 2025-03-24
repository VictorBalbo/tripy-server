export interface WeatherOpenMeteo {
	latitude: number
	longitude: number
	utc_offset_seconds: number
	timezone: string
	timezone_abbreviation: string
	elevation: number
	hourly_units?: HourlyUnits
	hourly?: Hourly
	daily_units: DailyUnits
	daily: Daily
}

interface HourlyUnits {
	time: string
	temperature_2m: string
	precipitation: string
	wind_speed_10m: string
}

interface Hourly {
	time: string[]
	temperature_2m: number[]
	precipitation: number[]
	wind_speed_10m: number[]
}

interface DailyUnits {
	time: string
	temperature_2m_max: string
	daylight_duration: string
	temperature_2m_min: string
	temperature_2m_mean: string
	sunset: string
	sunrise: string
}

interface Daily {
	time: string[]
	temperature_2m_max: number[]
	temperature_2m_min: number[]
	temperature_2m_mean: number[]
	sunset: string[]
	sunrise: string[]
  wind_speed_10m_max: number[]
  precipitation_sum: number[]
}
