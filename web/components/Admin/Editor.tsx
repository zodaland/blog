import { useState, useRef, useEffect } from 'react';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import { useAppSelector } from '../../redux/hooks';

import mime from 'mime-types';

import { EditorProps } from '../../interfaces';

const MyEditor = ({ id, html, setHtml }: EditorProps) => {
    const token = useAppSelector((state) => state.token);
    const [flag, setFlag] = useState<boolean>(false);
    const ref = useRef<Editor>(null);

    const handleChange = async () => {
        if (!ref.current) return;

        const instance = ref.current.getInstance();

        const html = instance.getHTML();
        const div = document.createElement('div');
        div.setAttribute('class', 'content');
        div.innerHTML = html;
        //Add code below you want to add class in input html
        //Remove br class
        const brElements = div.querySelectorAll('br');
        [].forEach.call(brElements, (element: HTMLParagraphElement) => {
            element.removeAttribute('class');
        });

        //Remove div's attribute all and Add codequote class
        const divElements = div.querySelectorAll('div');
        [].forEach.call(divElements, (element: HTMLParagraphElement) => {
            [].forEach.call(element.attributes, (attribute: Attr) => {
                element.removeAttribute(attribute.name);
            });
            element.removeAttribute('class');

            const codeElements = element.getElementsByTagName('code');
            if (codeElements.length > 0) {
                element.setAttribute('class', 'code');
            }
        });

        //setting code element attribute
        const codeElements = div.getElementsByTagName('code');
        if (codeElements.length > 0) {
            [].forEach.call(codeElements, (codeElement: HTMLElement) => {
                [].forEach.call(codeElement.attributes, (attribute: Attr) => {
                    if (attribute.name === 'class' || attribute.name === 'data-language') return;
                    codeElement.removeAttribute(attribute.name);
                });

                const languageName: string = codeElement.getAttribute('data-language') ?? '';
                if (languageName) codeElement.setAttribute('class', languageName);
            });
        }

        //img's attribute
        const imgElements = div.querySelectorAll('img');
        if (imgElements.length > 0) {
            [].forEach.call(imgElements, async (element: HTMLParagraphElement) => {
                [].forEach.call(element.attributes, (attribute: Attr) => {
                    if (attribute.name === 'src' || attribute.name === 'alt') return;
                    element.removeAttribute(attribute.name);
                });
                if (element.nextElementSibling && element.nextElementSibling.tagName === 'BR')
                    element.nextElementSibling.remove();
                if (element.attributes.length < 2) {
                    element.remove();
                    return;
                }
                if (!element.hasAttribute('src') || !element.hasAttribute('alt')) {
                    element.remove();
                    instance.setHTML(div.innerHTML);
                    return;
                }
                const dataURL = element.getAttribute('src');
                if (dataURL && dataURL.substr(0, 4) !== 'data') {
                    return;
                }

                //src, alt는 상단 체크 완료로 string 단언됨
                const alt = element.getAttribute('alt') as string;
                const file = dataURLtoFile(dataURL as string);
                if (!file) {
                    element.remove();
                    return;
                }

                const fileName = await uploadImage(file, token);
                if (!fileName) {
                    element.remove();
                    return;
                }

                element.setAttribute('alt', alt);
                element.setAttribute('src', `${process.env.NEXT_PUBLIC_IMAGE_URL}${fileName}`);

                instance.setHTML(div.innerHTML);
            });
        }

        setHtml(div.outerHTML);
    };

    useEffect(() => {
        setFlag(true);
    }, [id]);

    useEffect(() => {
        if (!ref.current || !flag) return;
        const instance = ref.current.getInstance();
        instance.setHTML(html);
        setFlag(false);
    }, [flag]);

    return (
        <>
            <Editor
                height="600px"
                initialEditType="markdown"
                useCommandShortcut={false}
                hideModeSwitch={true}
                ref={ref}
                onChange={handleChange}
                toolbarItems={[
                    ['heading', 'bold', 'italic', 'strike'],
                    ['hr', 'quote'],
                    ['ul', 'ol'],
                    ['table', 'image', 'link'],
                    ['code', 'codeblock'],
                ]}
            />
        </>
    );
};

const uploadImage = async (file: File, token: string): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const res = await fetch('https://blogapi.test.zodaland.com/board/image', {
            mode: 'cors',
            credentials: 'same-origin',
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const text = await res.text();
        const fileName = text.replace(/\n|\r/g, '');
        return fileName;
    } catch (error) {
        return null;
    }
};

const dataURLtoFile = (dataURL: string): File | null => {
    const arr: string[] = dataURL.split(',');
    if (!arr || arr.length < 1) return null;
    const matched = arr[0].match(/:(.*?);/) as RegExpMatchArray;
    const mimeType = matched[1];
    const fileName = btoa(new Date().getTime().toString()) + '.' + mime.extension(mimeType);
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mimeType });
};

export default MyEditor;
