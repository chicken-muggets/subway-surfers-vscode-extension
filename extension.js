const vscode = require('vscode');
const path = require('path');

function getVideoHtml(webview, context) {
    const videoPathOnDisk = vscode.Uri.file(
        path.join(context.extensionPath, 'media', 'video.mp4')
    );

    const videoSrc = webview.asWebviewUri(videoPathOnDisk);

    return `
        <!DOCTYPE html>
        <html lang="en">
        <body>
            <video controls preload="auto" autoplay loop width="100%">
                <source src="${videoSrc}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </body>
        </html>`;
}

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('brainrot-watcher.getVideoHtml', () => {
        const panel = vscode.window.createWebviewPanel(
            'videoPlayer', 
            'Subway survers', 
            vscode.ViewColumn.Beside, 
            { 
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))]
            }
        );

        panel.webview.html = getVideoHtml(panel.webview, context);
    }));
}

exports.activate = activate;