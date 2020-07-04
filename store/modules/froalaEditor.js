const state = () => {
  return {
    toolbarButtons: [
      'paragraphFormat',
      '|',
      'fontSize',
      '|',
      // '-',
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'align',
      '-',
      'color',
      'insertHR',
      '|',
      'insertLink',
      'insertImage',
      'insertFile',
      'insertTable',
      'formatOL',
      'formatUL',
      'quote',
      'insertCode',
      'inlineCode',
    ],
    // 独立编辑器toolbar
    toolbarButtonsWrite: [
      'paragraphFormat',
      '|',
      'fontSize',
      '|',
      'emoticons',
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'color',
      '|',
      'align',
      'inlineClass',
      'insertHR',
      'quote',
      'insertCode',
      '|',
      'insertLink',
      'insertImage',
      'insertFile',
      'insertTable',
      'formatOL',
      'formatUL',
      '|',
      'clearFormatting',
      'fullscreen',
    ],
    // 快速编辑按钮
    quickInsertButtons: [
      'image',
      'embedly',
      'table',
      'ul',
      'ol',
      'hr',
      'insertCode'
    ],
    // 字体型号
    paragraphFormat: {
      N: 'Normal',
      H1: 'Heading 1',
      H2: 'Heading 2',
      H3: 'Heading 3',
      H4: 'Heading 4',
    }
  }
}

const mutations = {
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
