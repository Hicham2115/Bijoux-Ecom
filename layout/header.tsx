import Navbar from "@/components/comp-577";

export function Header() {
  return (
    <>
      <div className="flex min-h-8 items-center gap-4 overflow-hidden bg-[#f4f0e8] px-5 text-[9px] font-medium uppercase tracking-[0.14em] text-[#292820] sm:px-[5.5%] sm:text-[10px]">
        <div
          className="min-w-0 flex-1 overflow-hidden"
          role="region"
          aria-label="Complimentary shipping and returns, lifetime care, a more inclusive luxury"
        >
          <div
            className="announcement-track flex w-max items-center hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {Array.from({ length: 8 }, (_, repeat) => (
                  <p
                    key={repeat}
                    className="flex shrink-0 items-center gap-5 pr-10 sm:gap-8 sm:pr-16"
                  >
                    <span>Complimentary shipping & returns</span>
                    <span>|</span>
                    <span>Lifetime care</span>
                    <span>|</span>
                    <span>A more inclusive luxury</span>
                    <span>|</span>
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
}
