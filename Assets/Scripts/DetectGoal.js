var parent : Transform;

function OnTriggerEnter () {
	//Debug.Log("Success!");
	parent.GetComponent(GameLoop).Finish(true);
}
