private var isRotating : boolean = false;
private var oldRotation : Quaternion;
private var newRotation : Quaternion;
private var slerp_t : float;
private var elements : Transform;

function Start() {
	elements = transform.Find("Elements").transform;
}

function Update () {
	//Debug.Log("hello");
	if (isRotating) {
		if (slerp_t < 1) {
			slerp_t += Time.deltaTime * 10 * (1.01 - slerp_t);
			if (slerp_t >= 1) {
				slerp_t = 1;
				StopRotating();
			}
		}
		elements.rotation = Quaternion.Slerp(oldRotation, newRotation, slerp_t);
	} else {
		// TBD
	}
}

function IsRotating() {
	return isRotating;
}

function CanRotate() {
	// TODO: check collision
	return true;
}

function StartRotation(angle : Vector3) {
	oldRotation = elements.rotation;
	elements.Rotate(angle);
	newRotation = elements.rotation;
	elements.rotation = oldRotation;
	slerp_t = 0;
	isRotating = true;

	for (var child : Transform in elements) {
		y = Mathf.RoundToInt(child.transform.eulerAngles.y);
		if (child.transform.Find("C90")) {
			if (y % 180 == 0) {
				child.transform.Find("C90").gameObject.active = false;
				child.transform.Find("C0").gameObject.active = false;
			} else {
				child.transform.Find("C0").gameObject.active = false;
				child.transform.Find("C90").gameObject.active = false;
			}
		}
	}
}

function StopRotating() {
	isRotating = false;
	for (var child : Transform in elements) {
		y = Mathf.RoundToInt(child.transform.eulerAngles.y);
		if (child.transform.Find("C90")) {
			if (y % 180 == 0) {
				child.transform.Find("C90").gameObject.active = true;
				child.transform.Find("C0").gameObject.active = false;
			} else {
				child.transform.Find("C0").gameObject.active = true;
				child.transform.Find("C90").gameObject.active = false;
			}
		}
	}
}
