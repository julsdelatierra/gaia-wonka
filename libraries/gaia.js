var gaia = {
  ui: {}
};

/*
Implementation:
gaia.ui.dialog({
  title: '',
  message: '',
  buttons: [
    {
      'title': 'Ok',
      'type': 'recommend',
      'onClick': function() {}
    },
    {
      'title': 'Cancel',
      'type': 'default',
      'onClick': function() {}
    }
  ]
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

  var buttons = $('<menu>');

  for (var i in options.buttons) {
    var button = options.buttons[i];
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
        dialog.fadeOut('slow', function() {
          dialog.remove();
        });
      });
    }

    if (options.buttons.length == 1) {
      buttonTag.css('width', 'calc(100%)');
    }

    buttons.append(buttonTag);

  }

  dialog.append(buttons);

  $('[role="application"]').append(dialog);

}