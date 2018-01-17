// exports a single single function to send feedback on which key is being pressed and which to update to rerender

(function() {
  let pressedKeys = {};

  function setKey(e, status) {
    let keyCode = e.keyCode;
    let key;

    switch (keyCode) {
      case 87:
      key = 'UP';
      this.pressedKeys[key] = status;
      break;
      case 83:
      key = 'DOWN';
      this.pressedKeys[key] = status;
      break;
      case 65:
      key = 'LEFT';
      this.pressedKeys[key] = status;
      break;
      case 68:
      key = 'RIGHT';
      this.pressedKeys[key] = status;
      break;
    }
  }

  document.addEventListener('keydown', (e) => {
    setKey(e, true);
  });

  document.addEventListener('keyup', (e) => {
    setKey(e, false);
  });

})();
