import { ActivityType, Client } from "discord.js";
const activities = ["to the melody of the magic word", "to you thanking one other", "dombıra"];

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
