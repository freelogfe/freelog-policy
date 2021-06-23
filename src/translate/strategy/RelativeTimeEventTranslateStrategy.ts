import {EventTranslateStrategy} from "./EventTranslateStrategy";
import {Event, EventTool, FSMTool} from "../index";
import moment = require("moment");

export class RelativeTimeEventTranslateStrategy implements EventTranslateStrategy {

    getEventName(): string {
        return RelativeTimeEventTranslateStrategy.EVENT_NAME;
    }

    translate(event: Event, isSign?: boolean): string {
        let elapsed = event.args["elapsed"];
        let timeUnit = event.args["timeUnit"];

        if (isSign) {
            let seconds = elapsed * EventTool.perSeconds4TimeUnit(timeUnit);
            if (seconds <= 60 * 60 * 24) {
                let date = new Date(seconds * 1000);
                return `${moment(date).utc().format("HH:mm")}之后，${FSMTool.parseTransitionInfo(event.state)}`;
            } else {
                let date = new Date();
                date.setSeconds(date.getSeconds() + seconds);
                return `于${moment(date).format("YYYY/MM/DD HH:mm")}，${FSMTool.parseTransitionInfo(event.state)}`;
            }
        } else {
            if (timeUnit == "cycle") {
                elapsed *= 4;
                timeUnit = "hour";
            }
            return `${elapsed}${EventTool.getName4TimeUnit(timeUnit)}之后，${FSMTool.parseTransitionInfo(event.state)}`;
        }

    }

    static EVENT_NAME: string = "RelativeTimeEvent";
}