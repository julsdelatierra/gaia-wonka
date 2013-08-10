var gaia = {
  ui: {}
};

/*
Implementation:
gaia.ui.dialog({
  title: '',
  message: ''
});
*/

gaia.ui.dialog = function(options) {

  var dialog = $('<form>', {
    role: "dialog",
    onsubmit: 'return false;'
  });

  var container = $('<section>');

  if (options.title) {
    var title = $('<h1>', {
      text: options.title
    });
    container.append(title);
  }

  var message = $('<p>', {
    text: options.message
  });

  container.append(message);

  dialog.append(container);

  var buttonsBar = $('<menu>');

  var buttons = [];

  if ('rightButton' in options) {
    buttons.push(options.rightButton);
  }

  if ('leftButton' in options) {
    buttons.push(options.leftButton);
  }

  if (buttons.length == 0) {
    buttons.push({
      title: 'OK',
      type: 'default'
    });
  }

  for (var i in buttons) {
    var button = buttons[i];
    var buttonProps = {
      text: button.title
    };
    if (button.type != '') {
      buttonProps['class'] = button.type;
    }

    var buttonTag = $('<button>', buttonProps);

    if ('onClick' in button) {
      buttonTag.on('click', button.onClick);
    } else {
      buttonTag.on('click', function() {
        dialog.fadeOut(600, function() {
          dialog.remove();
        });
      });
    }

    if (buttons.length == 1) {
      buttonTag.css('width', 'calc(100%)');
    }

    buttonsBar.append(buttonTag);

  }

  dialog.append(buttonsBar);

  $('[role="application"]').append(dialog);

  dialog.fadeIn(600);

}