var rotationWithQuaternion = function() {
	'use_strict';

	var mouseDown = false;
	var rotateStartPoint = new THREE.Vector3(0, 0, 1);
	var rotateEndPoint = new THREE.Vector3(0, 0, 1);

	var startPoint = { x: 0, y: 0 };
	var deltaX = 0;
	var deltaY = 0;

	var curQuaternion;
	var rotationSpeed = 2;
	var lastMoveTimestamp;
	var moveReleaseTimeDelta = 50;

	var setup = function()	{
		document.addEventListener('mousedown', onDocumentMouseDown, false);
		animate();
	};

	function onDocumentMouseDown(event) {
		event.preventDefault();

		document.addEventListener('mousemove', onDocumentMouseMove, false);
		document.addEventListener('mouseup', onDocumentMouseUp, false);

		mouseDown = true;

		startPoint = {
			x: event.clientX,
			y: event.clientY
		};

		rotateStartPoint = rotateEndPoint = projectOnTrackball(0, 0);
	}

	function onDocumentMouseMove(event) {
		deltaX = event.x - startPoint.x;
		deltaY = event.y - startPoint.y;

		handleRotation();

		startPoint.x = event.x;
		startPoint.y = event.y;

		lastMoveTimestamp = new Date();
	}

	function onDocumentMouseUp(event) {
		if (new Date().getTime() - lastMoveTimestamp.getTime() > moveReleaseTimeDelta) {
			deltaX = event.x - startPoint.x;
			deltaY = event.y - startPoint.y;
		}

		mouseDown = false;

		document.removeEventListener('mousemove', onDocumentMouseMove, false);
		document.removeEventListener('mouseup', onDocumentMouseUp, false);
	}

	function projectOnTrackball(touchX, touchY) {
		var mouseOnBall = new THREE.Vector3();

		mouseOnBall.set(
			clamp(touchX / windowHalfX, -1, 1), 
      clamp(-touchY / windowHalfY, -1, 1),
			0.0
		);

		var length = mouseOnBall.length();

		if (length > 1.0) {
			mouseOnBall.normalize();
		} else {
			mouseOnBall.z = Math.sqrt(1.0 - length * length);
		}

		return mouseOnBall;
	}

	function clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}

	function rotateMatrix(rotateStart, rotateEnd) {
		var axis = new THREE.Vector3();
		var quaternion = new THREE.Quaternion();

		var angle = Math.acos(rotateStart.dot(rotateEnd) / rotateStart.length() / rotateEnd.length());

		if (angle) {
			axis.crossVectors(rotateStart, rotateEnd).normalize();
			angle *= rotationSpeed;
			quaternion.setFromAxisAngle(axis, angle);
		}
		return quaternion;
	}


	function animate() {
		requestAnimationFrame(animate);
		render();
	}

	function render() {
		if (!mouseDown) {
			var drag = 0.95;
			var minDelta = 0.05;

			if (deltaX < -minDelta || deltaX > minDelta) {
				deltaX *= drag;
			} else {
				deltaX = 0;
			}

			if (deltaY < -minDelta || deltaY > minDelta) {
				deltaY *= drag;
			} else {
				deltaY = 0;
			}

			handleRotation();
		}

		renderer.render(scene, camera);
	}

	var handleRotation = function() {
		rotateEndPoint = projectOnTrackball(deltaX, deltaY);

		var rotateQuaternion = rotateMatrix(rotateStartPoint, rotateEndPoint);
		curQuaternion = cube.quaternion;
		curQuaternion.multiplyQuaternions(rotateQuaternion, curQuaternion);
		curQuaternion.normalize();
		cube.setRotationFromQuaternion(curQuaternion);

		rotateEndPoint = rotateStartPoint;
	};
}