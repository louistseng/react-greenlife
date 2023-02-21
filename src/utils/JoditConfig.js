const myConfig = {
    uploader: {
        // url: "/api/upload",
        insertImageAsBase64URI: true
    },
    language: "zh_tw",
    height: "400",
    colorPickerDefaultTab: 'color',
    placeholder:"請輸入網誌內容(10,000字以內)",
    askBeforePasteHTML: false,
    defaultActionOnPaste: "insert_only_text",
    buttons: [
        'bold',
        'italic', '|',
        'fontsize',
        'brush', '|',
        'image',
        "link", '|',
        'left',
        'center',
        'right',
        'justify', '|',
        'undo', 'redo', '|',
        'hr',
    ],
    disablePlugins: ["about", "wrap-text-nodes", "copy-format", "clipboard", "error-messages", "fullsize", "hotkeys", "iframe",  "mobile", "print", "table", "table-keyboard-navigation", "limit", "search", "video", "stat", "select-cells", "resize-handler", "file", "source", "clean-html", "autofocus", "media", "xpath", "symbols", "preview", "indent"],

    // controls: {
    //     font: {
    //         list: {
    //             "": "Default",
    //             "Microsoft JhengHei": "微軟正黑體",
    //             "DFKai-SB": "標楷體",
    //             "MingLiU": "細明體",
    //             "PMingLiU": "新細明體",
    //             "Helvetica,sans-serif": "Helvetica",
    //             "Arial,Helvetica,sans-serif": "Arial",
    //             "Georgia,serif": "Georgia",
    //             "Impact,Charcoal,sans-serif": "Impact",
    //             "Tahoma,Geneva,sans-serif": "Tahoma",
    //             "'Times New Roman',Times,serif": "Times New Roman",

    //         }
    //     }
    // }
}

const readOnlyConfig = {
        toolbar: false,
        readonly: true,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        inline: true,
        useSearch: false,
        disablePlugins: "source"
    }
export { myConfig, readOnlyConfig }