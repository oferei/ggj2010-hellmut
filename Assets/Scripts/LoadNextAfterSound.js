private var isPlaying : boolean = false;

function Start() {
}

function Update () {
	if (GetComponent(AudioSource).isPlaying) {
		isPlaying = true;
	} else {
		if (isPlaying) {
			Application.LoadLevel("play");
		}
	}
}
