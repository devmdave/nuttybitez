const fs = require('fs');

const path = 'd:\\nuttybitez\\src\\components\\DigitalFlavourBook.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove HTMLFlipBook import
content = content.replace("import HTMLFlipBook from 'react-pageflip';", "");

// 2. Add Book3D component above DigitalFlavourBook
const book3dCode = `
const Book3D: React.FC<{
  children: React.ReactNode;
  currentSpread: number;
  bookDimensions: { width: number; height: number };
}> = ({ children, currentSpread, bookDimensions }) => {
  const pages = React.Children.toArray(children);
  const sheets = [];
  for (let i = 0; i < pages.length; i += 2) {
    sheets.push({
      front: pages[i],
      back: pages[i + 1] || null
    });
  }

  const isClosed = currentSpread === 0;
  const isBackClosed = currentSpread === sheets.length;
  const translateX = isClosed ? '-25%' : isBackClosed ? '25%' : '0%';

  return (
    <div 
      className="relative mx-auto transition-transform duration-1000 ease-in-out"
      style={{
        width: bookDimensions.width * 2,
        height: bookDimensions.height,
        transform: \`translateX(\${translateX})\`,
        perspective: '3500px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Center Spine Shadow (Only visible when book is open) */}
      <div 
        className={\`absolute top-0 bottom-0 left-1/2 w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/20 to-transparent z-0 pointer-events-none transition-opacity duration-1000 \${isClosed || isBackClosed ? 'opacity-0' : 'opacity-100'}\`} 
      />

      {sheets.map((sheet, i) => {
        const isFlipped = i < currentSpread;
        const zIndex = isFlipped ? 10 + i : 50 - i;
        
        return (
          <div
            key={i}
            className="absolute top-0 right-0 h-full"
            style={{
              width: '50%',
              transformOrigin: 'left center',
              transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.9s cubic-bezier(0.4, 0.0, 0.2, 1)',
              zIndex,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* FRONT FACE (Right Page) */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden rounded-r-xl border-l border-brand-roast/20"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
                backgroundColor: '#FAF3E8',
              }}
            >
              {sheet.front}
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/15 to-transparent pointer-events-none" />
            </div>
            
            {/* BACK FACE (Left Page when flipped) */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden rounded-l-xl border-r border-brand-roast/20"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                backgroundColor: '#FAF3E8',
              }}
            >
              {sheet.back}
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/15 to-transparent pointer-events-none" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
`;
content = content.replace("export const DigitalFlavourBook", book3dCode + "\nexport const DigitalFlavourBook");

// 3. Add w-full h-full to Page
content = content.replace(
  "className={\`page relative bg-[#FAF3E8]",
  "className={\`page w-full h-full relative bg-[#FAF3E8]"
);

// 4. Update state variables and methods
content = content.replace(
  "const flipBookRef = useRef<any>(null);\n  const [currentPage, setCurrentPage] = useState<number>(0);\n  const [totalPages, setTotalPages] = useState<number>(12);",
  "const [currentSpread, setCurrentSpread] = useState<number>(0);\n  const totalSpreads = 6;\n  const currentPage = currentSpread === 0 ? 0 : currentSpread === 6 ? 11 : currentSpread * 2;"
);

// 5. Update keyboard navigation
content = content.replace(
  /const handleKeyDown =[\s\S]*?}, \[\]\);/m,
  `const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSpread]);`
);

// 6. Update handlers
content = content.replace(
  /const turnToPage = \(pageIndex: number\) => {[\s\S]*?};/m,
  `const turnToPage = (pageIndex: number) => {
    let spreadIndex = Math.floor(pageIndex / 2);
    if (pageIndex === 0) spreadIndex = 0;
    else if (pageIndex >= 11) spreadIndex = 6;
    setCurrentSpread(spreadIndex);
  };`
);

content = content.replace(
  /const handleNext = \(\) => {[\s\S]*?};/m,
  `const handleNext = () => {
    setCurrentSpread(s => Math.min(s + 1, totalSpreads));
    playPageFlipSound();
  };`
);

content = content.replace(
  /const handlePrev = \(\) => {[\s\S]*?};/m,
  `const handlePrev = () => {
    setCurrentSpread(s => Math.max(s - 1, 0));
    playPageFlipSound();
  };`
);

// 7. Replace HTMLFlipBook usage
// We find <HTMLFlipBook and replace it up to the first <Page
content = content.replace(
  /<HTMLFlipBook[\s\S]*?style=\{\{ margin: '0 auto' \}\}\n\s*>/m,
  `<Book3D currentSpread={currentSpread} bookDimensions={bookDimensions}>`
);

// We find </HTMLFlipBook> and replace with </Book3D>
content = content.replace(/<\/HTMLFlipBook>/g, "</Book3D>");

fs.writeFileSync(path, content);
console.log("Successfully rewrote DigitalFlavourBook.tsx");
