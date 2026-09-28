const fs = require('fs');
const path = 'd:\\nuttybitez\\src\\components\\DigitalFlavourBook.tsx';
let content = fs.readFileSync(path, 'utf8');

// We need to update Book3D to include transition state for zIndex
const newBook3D = `
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

  // Track the previous spread to handle z-index correctly during transition
  const [prevSpread, setPrevSpread] = useState(currentSpread);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (currentSpread !== prevSpread) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setPrevSpread(currentSpread);
        setIsAnimating(false);
      }, 900); // match transition duration
      return () => clearTimeout(timer);
    }
  }, [currentSpread, prevSpread]);

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
      {/* Center Spine Shadow */}
      <div 
        className={\`absolute top-0 bottom-0 left-1/2 w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/20 to-transparent z-0 pointer-events-none transition-opacity duration-1000 \${isClosed || isBackClosed ? 'opacity-0' : 'opacity-100'}\`} 
      />

      {sheets.map((sheet, i) => {
        const isFlipped = i < currentSpread;
        
        // Z-Index Logic:
        // The sheet that is currently flipping must be at the very top.
        let zIndex = 0;
        const isFlippingForward = isAnimating && currentSpread > prevSpread && i === prevSpread;
        const isFlippingBackward = isAnimating && currentSpread < prevSpread && i === currentSpread;
        
        if (isFlippingForward || isFlippingBackward) {
          zIndex = 100; // Topmost during animation
        } else if (isFlipped) {
          zIndex = 10 + i; // Left stack
        } else {
          zIndex = 50 - i; // Right stack
        }
        
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
            {/* FRONT FACE */}
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
            
            {/* BACK FACE */}
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

// Replace the old Book3D definition with the new one
content = content.replace(/const Book3D: React\.FC<\{[\s\S]*?\}\n\}\n/m, newBook3D);

fs.writeFileSync(path, content);
console.log("Successfully updated Book3D zIndex logic.");
