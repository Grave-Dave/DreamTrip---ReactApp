function setFormStep1(step) {
	if (step === 1 || step === 2 || step === 3) {
		return 'progres-step active';
	} else return 'progres-step';
}
function setFormStep2(step) {
	if (step === 2 || step === 3) {
		return 'progres-step active';
	} else return 'progres-step';
}
function setFormStep3(step) {
	if (step === 3) {
		return 'progres-step active';
	} else return 'progres-step';
}
function setProgressBar(step) {
	if (step === 2) {
		return '50%';
	} else if (step === 3) {
		return '100%';
	} else return '0%';
}

export { setFormStep1, setFormStep2, setFormStep3, setProgressBar };
