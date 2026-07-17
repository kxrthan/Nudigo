const fs = require('fs');

const path = 'src/components/landing/DashboardPreview.tsx';
let content = fs.readFileSync(path, 'utf8');

const startStr = 'className="relative max-w-5xl mx-auto"';
const endStr = '</section>';

const startIdx = content.indexOf(startStr);
const endIdx = content.indexOf(endStr);

if (startIdx !== -1 && endIdx !== -1) {
    const header = content.substring(0, startIdx);
    let body = content.substring(startIdx, endIdx);
    const footer = content.substring(endIdx);

    // 1. Remove hidden sm:... and keep what's left
    body = body.replace(/hidden sm:(inline-block|inline-flex|flex)/g, '$1');

    // 2. Fix flex-col md:flex-row
    body = body.replace(/flex flex-col md:flex-row/g, 'flex flex-row');

    // 3. Fix widths
    body = body.replace(/w-full md:w-\[480px\]/g, 'w-[480px]');

    // 4. Fix grids
    body = body.replace(/grid-cols-1 sm:grid-cols-3/g, 'grid-cols-3');

    // 5. Strip all other md: and sm: prefixes
    body = body.replace(/md:([a-zA-Z0-9\[\]\-]+)/g, '$1');
    body = body.replace(/sm:([a-zA-Z0-9\[\]\-]+)/g, '$1');

    // 6. Make wrapper scrollable horizontally
    body = body.replace(
        'className="relative max-w-5xl mx-auto"',
        'className="relative max-w-5xl mx-auto overflow-x-auto pb-6 -mx-4 px-4 sm:mx-auto sm:px-0 scrollbar-hide"'
    );

    // 7. Set min-width on dashboard window
    body = body.replace(
        'className="bg-zinc-50 rounded-[2rem]',
        'className="min-w-[900px] bg-zinc-50 rounded-[2rem]'
    );
    // Since md: was already stripped:
    body = body.replace(
        'className="bg-zinc-50 rounded-2xl rounded-[2rem]',
        'className="min-w-[900px] bg-zinc-50 rounded-[2rem]'
    );
    
    // There might be a duplicate rounded class now (e.g. rounded-2xl rounded-[2rem]). Let's fix that.
    body = body.replace(/rounded-2xl rounded-\[2rem\]/g, 'rounded-[2rem]');

    fs.writeFileSync(path, header + body + footer, 'utf8');
    console.log('Successfully updated DashboardPreview.tsx');
} else {
    console.error('Could not find the start or end tags.');
}
