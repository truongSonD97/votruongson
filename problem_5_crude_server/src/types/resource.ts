import { ResourceType } from "../models/Resource";

export type ConditionQueyType = {
    [key: string]: string | ResourceType;
}