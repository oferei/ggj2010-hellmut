private var isSuspended : boolean = false;
private var oldVelocity : Vector3;
private var oldAngularVelocity : Vector3;

function Update () {
}

function Freeze() {
	rigidbody.useGravity = false;
	oldVelocity = rigidbody.velocity;
	rigidbody.velocity = Vector3(0, 0, 0);
	oldAngularVelocity = rigidbody.angularVelocity;
	rigidbody.angularVelocity = Vector3(0, 0, 0);
}

function Release() {
	rigidbody.useGravity = true;
	rigidbody.velocity = oldVelocity;
	rigidbody.angularVelocity = oldAngularVelocity;
}
