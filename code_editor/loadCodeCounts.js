let initCodeLines = function () {
    let codeBlocks = document.getElementsByClassName('has-line-num');
    Array.prototype.forEach.call(codeBlocks, (codeBlock) => {
        codeBlock.innerHTML = codeBlock.textContent
        .trim()
        .replace(/^/, '<span class="code-line">')
        .replace(/\n/g, '</span>\n<span class="code-line">')
        .replace(/$/, '</span>');
    });
}