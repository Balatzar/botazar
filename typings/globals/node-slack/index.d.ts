// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/56295f5058cac7ae458540423c50ac2dcf9fc711/node-slack/node-slack.d.ts
declare module "node-slack" {
    import request = require('request');

    class Slack {
        constructor(hookUrl: string, option?: Slack.Option);
        send(message: Slack.Message): any; //TODO: Here comes deferred's promise as a return type
        send(message: Slack.Message, callback: Slack.SendCallback): request.Request;
        respond(query: Slack.Query): Slack.TextResponse;
        respond(query: Slack.Query, callback: Slack.ResponseCallback): Slack.TextResponse;
    }

    namespace Slack {

        interface Option {
            proxy: string;
        }

        interface Message {
            text: string;
            channel?: string;
            username?: string;
            icon_emoji?: string;
            attachments?: any[];
            unfurl_links?: boolean;
            link_names?: number;
        }

        interface SendCallback {
            (err: any, body: any): any;
        }

        interface Query {
            token?: string;
            team_id?: string;
            channel_id?: string;
            channel_name?: string;
            timestamp?: number;
            user_id?: string;
            user_name?: string;
            text: string;
        }

        interface TextResponse {
            text: string;
        }

        interface ResponseCallback {
            (err: any, query: Query): any;
        }
    }

    export = Slack;
}