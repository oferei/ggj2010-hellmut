var soundBounce1 : AudioSource;
var soundBounce2 : AudioSource;
var soundBounce3 : AudioSource;
var soundBounce4 : AudioSource;
var soundBounce5 : AudioSource;
var soundBounce6 : AudioSource;
var soundBounce7 : AudioSource;
var soundBounce8 : AudioSource;
var soundBounce9 : AudioSource;
var soundBounce10 : AudioSource;
var soundBounce11 : AudioSource;

private var curPlayer : AudioSource;

function OnCollisionEnter () {
	var r : int = Random.Range(0, 11);
	switch (r) {
		case 0: Play(soundBounce1); break;
		case 1: Play(soundBounce2); break;
		case 2: Play(soundBounce3); break;
		case 3: Play(soundBounce4); break;
		case 4: Play(soundBounce5); break;
		case 5: Play(soundBounce6); break;
		case 6: Play(soundBounce7); break;
		case 7: Play(soundBounce8); break;
		case 8: Play(soundBounce9); break;
		case 9: Play(soundBounce10); break;
		case 10: Play(soundBounce11); break;
	}
}

function IsPlaying() {
	return (curPlayer && curPlayer.isPlaying);
}

function Play(sound : AudioSource) {
	if (!transform.root.GetComponent(GameLoop).isComplete) {
		if (!IsPlaying()) {
			curPlayer = sound;
			curPlayer.Play();
		}
	}
}
