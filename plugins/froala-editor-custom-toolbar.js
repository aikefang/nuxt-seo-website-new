module.exports = () => {
  $.FroalaEditor.DefineIcon('insertCode', {NAME: 'code'})
  $.FroalaEditor.RegisterCommand('insertCode', {
    title: '插入代码段',
    type: 'dropdown',
    focus: false,
    undo: false,
    refreshAfterCallback: true,
    options: {
      // 传输的值 : toolbar显示的内容
      'brush: javascript;': 'Javascript',
      'brush: html;': 'HTML',
      'brush: css;': 'CSS',
      'brush: sql;': 'MySql',
      'brush: php;': 'PHP',
      'brush: ruby;': 'Ruby',
      'brush: python;': 'Python',
      'brush: perl;': 'Perl',
      'brush: java;': 'Java',
      'brush: bash;': 'Bash',
      'brush: shell;': 'Shell',
    },
    callback: function (cmd, val) {
      this.html.insert(`<pre class="${val}">${this.selection.text()}</pre>`)
      this.undo.saveStep()
    },
    refresh: function ($btn) {
//            console.log ('do refresh');
    },
    refreshOnShow: function ($btn, $dropdown) {
//            console.log ('do refresh when show');
    }
  })
  $.FroalaEditor.RegisterQuickInsertButton('insertCode', {
    // Icon name.
    icon: 'insertCode',
    // Tooltip.
    title: '默认JS代码，插入后可以更改类型',
    // Callback for the button.
    callback: function () {
      // Call any editor method here.
      // this.html.insert('Hello Froala!');
      this.html.insert(`<pre class="brush: javascript;"></pre>`)
      this.undo.saveStep()
    },

    // Save changes to undo stack.
    undo: true
  })
}