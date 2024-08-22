import {DataSource} from "typeorm";
import typeormConfig from "../configs/typeorm.config";

export const DatasourceDal: DataSource = new DataSource(typeormConfig);