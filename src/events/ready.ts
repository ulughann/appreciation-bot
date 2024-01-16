import { ActivityType, Client } from "discord.js";
const activities = ["Onrir", "github.com/onrirr/ts-discord-bot"];

export default {
	name: 'ready',
	once: true,
	execute(client: Client) {
		let i = 0;
		setInterval(() => {
			const activityName = activities[i++ % activities.length];
			client.user.setActivity({ name: activityName, type: ActivityType.Listening });
		}, 1881 * 10);
	},
};
