import { IPaginationQuery } from "lta-component-library";
import { GetResponse } from "../shared/interfaces";

export interface GetWeatherForecastResponse
  extends GetResponse<GetWeatherForecastResponseDto> {}

export interface GetWeatherForecastResponseDto {
  id: number;
  date: Date;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export interface IWeatherQuery extends IPaginationQuery {
  sortingParams?: { [name: string]: string };
  filter?: string;
}
