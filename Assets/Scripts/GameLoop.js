var soundRotate : AudioSource;
var soundWin: AudioSource;
var soundLose: AudioSource;
var credits : Transform;

// level instance
private var curLevel : Object;
private var curLevelCode : Component;
private var isRotating : boolean = false;
public var isComplete : boolean = false;
private var isInGoal : boolean = false;
private var inGoalTime : float;
private var isInDitch : boolean = false;
private var inDitchTime : float;

private var hellmut : Transform;

function Start() {
	hellmut = transform.Find("Hellmut 1").transform;
	credits.gameObject.active = false;

	LoadLevel("Levels/Level1");
}

function Update () {
	if (!isComplete) {
		if (isRotating) {
			if (!curLevel.GetComponent(RoomRotate).IsRotating()) {
				isRotating = false;
				hellmut.GetComponent(SuspendTime).Release();
			}
		} else {
			var shouldRotate : boolean = false;
			var angle : Vector3;
			if (Input.GetKeyDown("left")) {
				shouldRotate = true;
				angle = Vector3(0, -90, 0);
			}
			if (Input.GetKeyDown("right")) {
				shouldRotate = true;
				angle = Vector3(0, 90, 0);
			}
			/*
			if (Input.GetKeyDown("up")) {
				shouldRotate = true;
				angle = Vector3(0, 0, 90);
			}
			if (Input.GetKeyDown("down")) {
				shouldRotate = true;
				angle = Vector3(0, 0, -90);
			}
			*/
			if (shouldRotate && curLevel.GetComponent(RoomRotate).CanRotate()) {
				isRotating = true;
				soundRotate.Play();
				curLevel.GetComponent(RoomRotate).StartRotation(angle);
				hellmut.GetComponent(SuspendTime).Freeze();

				/*
				for (var child : Transform in transform) {
					y = Mathf.RoundToInt(child.transform.eulerAngles.y);
					// TODO: check for colissions now (cannot do)
				}
				*/

			}
		}
	}

	if (isInGoal) {
		if (Time.time - inGoalTime > 1.5) {
			isInGoal = false;
			soundWin.Play();
			credits.gameObject.active = true;
			credits.transform.position = Vector3(0.5, 0.5, 0);
		}
	}

	if (isInDitch) {
		if (Time.time - inDitchTime > 1.5) {
			isInDitch = false;
			Application.LoadLevel("play");
		}
	}
}

function LoadLevel(path : String) {
	var asset : Object = Resources.Load(path);
	if (!asset) {
		Debug.Log("asset not found");
	} else {
		curLevel = Instantiate(asset);
		curLevel.transform.position = Vector3(0, 6, 0);
		curLevel.transform.Find("Goal").GetComponent(DetectGoal).parent = transform.root;
	}
}

function Finish(alive : boolean) {
	if (!isComplete) {
		isComplete = true;
		if (alive) {
			isInGoal = true;
			inGoalTime = Time.time;
		} else {
			soundLose.Play();
			isInDitch = true;
			inDitchTime = Time.time;
		}
	}
}
