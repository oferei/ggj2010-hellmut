function OnCollisionEnter() {
	//Debug.Log("You're dead!");
	transform.root.GetComponent(GameLoop).Finish(false);
}