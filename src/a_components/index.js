/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Keyboard Roto component for A-Frame.
 */
AFRAME.registerComponent('keyboard-roto', {
  schema: {},

  multiple: false,

  init: function () {
    this.onKeyDown = this.onKeyDown.bind(this)
    this.euler = new THREE.Euler(0, 0, 0, 'XYZ');
    window.addEventListener('keydown', this.onKeyDown);
  },

  remove: function () {
    window.removeEventListener('keydown', this.onKeyDown);
  },

  pause: function () {
    window.removeEventListener('keydown', this.onKeyDown);
  },

  play: function () {
    window.addEventListener('keydown', this.onKeyDown);
  },

  onKeyDown: function (event) {
    event.key === 'ArrowRight' && this.yawRight()
    event.key === 'ArrowLeft' && this.yawLeft()
    event.key === 'ArrowDown' && this.pitchUp()
    event.key === 'ArrowUp' && this.pitchDown()

  },

  yawRight: function() {
    this.rotate('y', .01)
  },

  yawLeft: function() {
    this.rotate('y', -.01)
  },
  
  pitchDown: function() {
    this.rotate('x', -.01)
  },
  
  pitchUp: function() {
    this.rotate('x', .01)
  },

  rotate: function(axis, magnitude){
    let x = this.el.object3D.rotation.x + (axis === 'x' ? magnitude : 0);
    let y = this.el.object3D.rotation.y + (axis === 'y' ? magnitude : 0);
    let z = this.el.object3D.rotation.z + (axis === 'z' ? magnitude : 0);
    this.euler.set(x, y, z)

    let quat = new THREE.Quaternion();
    quat.setFromEuler(this.euler);
    console.log('EULERRRRRR:', this.euler)
    console.log("QUATERNION:", quat)
    this.el.object3D.rotation.setFromQuaternion(quat);
  }
  
});
