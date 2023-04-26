// Write your types here! ✨

export type MotionBase = {
	from: "defendant" | "plaintiff";
	reason: string;
};

export type PreTrialMotion = MotionBase & {
	classification: "dismiss" | "suppress" | "venue";
	step: "pre-trial";
};

export type PostTrialMotion = MotionBase & {
	classification: "acquittal" | "correction" | "new trial";
	step: "post-trial";
};

export type TrialMotion = PostTrialMotion | PreTrialMotion;

export type AllowedMotion = TrialMotion & {
	deliberationHours: number;
	status: "allowed";
};

export type DeniedMotion = TrialMotion & {
	annoyedJustice: boolean;
	deliberationHours: number;
	status: "denied";
};

export type PatataMotion = TrialMotion & {
	status: "patata";
	numberOfPatatas: number;
};

export type PendingMotion = TrialMotion & {
	estimatedDeliberationHours: number;
	status: "pending";
};

export type Motion =
	| AllowedMotion
	| DeniedMotion
	| PendingMotion
	| PatataMotion;

function GiveMeMotion(): Motion {
	return {
		annoyedJustice: true,
		classification: "acquittal",
		deliberationHours: 1,
		from: "defendant",
		reason: "The heretofore document had dried ink on it.",
		status: "denied",
		step: "post-trial",
	};
}
const motion = GiveMeMotion();

if (motion.status === "denied") {
	motion.annoyedJustice;
}

if ("annoyedJustice" in motion) {
	motion.annoyedJustice;
}

if (isDeniedMotion(motion)) {
	motion.annoyedJustice;
}

function isDeniedMotion(motion: Motion): motion is DeniedMotion {
	return motion.status === "denied";
}

switch (motion.status) {
	case "denied":
		motion.annoyedJustice;
		console.log("dasdasdas");
		break;
	case "allowed":
		break;
	case "pending":
		break;
	case "patata":
		break;
	default:
		neverCheck(motion);
}

function neverCheck(never: never) {
	throw new Error("never value is not never");
}

export const motions: Motion[] = [
	{
		annoyedJustice: true,
		classification: "acquittal",
		deliberationHours: 1,
		from: "defendant",
		reason: "The heretofore document had dried ink on it.",
		status: "denied",
		step: "post-trial",
	},
	{
		annoyedJustice: true,
		classification: "correction",
		deliberationHours: 2.5,
		from: "plaintiff",
		reason: "The tenant has ninety days to vacate.",
		status: "denied",
		step: "post-trial",
	},
	{
		classification: "suppress",
		deliberationHours: 4,
		from: "plaintiff",
		reason: "Frank was never allowed in the house.",
		status: "allowed",
		step: "pre-trial",
	},
	{
		classification: "new trial",
		estimatedDeliberationHours: 3,
		from: "defendant",
		reason: "The duel's been accepted. There's no backing out. That's the law.",
		status: "pending",
		step: "post-trial",
	},
	{
		annoyedJustice: false,
		classification: "dismiss",
		deliberationHours: 0.5,
		from: "plaintiff",
		reason:
			"It seems like you have a tenuous grasp on the English language in general.",
		status: "denied",
		step: "pre-trial",
	},
	{
		annoyedJustice: true,
		classification: "correction",
		deliberationHours: 1.5,
		from: "defendant",
		reason: "Fillibuster?",
		status: "denied",
		step: "post-trial",
	},
	{
		annoyedJustice: true,
		classification: "venue",
		deliberationHours: 0.25,
		from: "defendant",
		reason: "A time was never specified for the duel.",
		status: "denied",
		step: "pre-trial",
	},
	{
		annoyedJustice: true,
		classification: "correction",
		deliberationHours: 5,
		from: "plaintiff",
		reason: "He's making a few good points!",
		status: "denied",
		step: "post-trial",
	},
];
