import {EventEntity} from "../tools/EventTool";
import {ContractElementInfo} from "../index";

export interface EventTranslateStrategy {

    getEventName(): string;

    translate(event: EventEntity, isSign?: boolean): EventTranslateInfo;
}

export class EventTranslateInfo extends ContractElementInfo {
    args?: object;
}
