function Start() {
	y = Mathf.RoundToInt(transform.eulerAngles.y);
	if (y % 180 == 0) {
		transform.Find("C90").gameObject.active = true;
		transform.Find("C0").gameObject.active = false;
	} else {
		transform.Find("C0").gameObject.active = true;
		transform.Find("C90").gameObject.active = false;
	}
}