import { useEffect } from 'react';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/foundation.css';

import { MarkdownProps } from '../interfaces';

const Markdown = ({ className, html }: MarkdownProps) => {
    useEffect(() => {
        hljs.configure({ cssSelector: '.code pre code', ignoreUnescapedHTML: true });
        hljs.highlightAll();
    });

    return (
        <>
            {html && <div className={className ?? ''} dangerouslySetInnerHTML={{ __html: html }} />}
        </>
    );
};

export default Markdown;
