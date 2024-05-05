// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "nexus-svg" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'nexus-svg.showPreview',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        let document = editor.document;

        let documentText = document.getText();

        let svgContent = '<svg ';
        const left = documentText.split('<svg');
        if (left.length > 1) {
          svgContent += left[1].split('</svg>')[0] + '</svg>';
        } else {
          return null;
        }

        //replace any custom color to green
        const regex = /\${color}/i;
        svgContent = svgContent.replace(regex, '#000000');

        const panel = vscode.window.createWebviewPanel(
          'nexus-svg-preview',
          'SVG Preview',
          vscode.ViewColumn.One,
          {},
        );
        panel.webview.html = `<!DOCTYPE html><html><head></head><body style="background-color:white;">${svgContent}</body></html>`;
      }
    },
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
