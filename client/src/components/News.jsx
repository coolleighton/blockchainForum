import arrowRight from "../images/arrowRight.png";

const News = () => {
  return (
    <div className="bg-gray-100 h-fit mx-2 mt-4 sm:my-0 sm:w-[25%] p-6 flex flex-col justify-center items-center rounded">
      <div>
        <h2 className="text-2xl bold pb-2">News</h2>
        <a
          rel="noreferrer"
          href="https://www.benjamindada.com/zone-raises-seed-blockchain-fintech-nigerian/"
          target="_blank"
        >
          <button className="flex items-center hover:brightness-0 duration-200 pt-2">
            <p className="regular text-gray-600 text-sm text-left">
              Nigerian blockchain fintech startup Zone raises $8.5M Seed
            </p>
            <img src={arrowRight} alt="arrow-right" className="h-6 pl-1"></img>
          </button>
        </a>
        <hr className="border-gray-400 my-2"></hr>
        <a
          rel="noreferrer"
          href="https://news.google.com/articles/CBMiY2h0dHBzOi8vcmVzZWFyY2guY2hlY2twb2ludC5jb20vMjAyNC9ldGhlcmV1bXMtY3JlYXRlMi1hLWRvdWJsZS1lZGdlZC1zd29yZC1pbi1ibG9ja2NoYWluLXNlY3VyaXR5L9IBAA?hl=en-GB&gl=GB&ceid=GB%3Aen"
          target="_blank"
        >
          <button className="flex items-center hover:brightness-0 duration-200 pt-2">
            <p className="regular text-gray-600 text-sm text-left">
              Ethereums create2 a double edged sword in blockchain security
            </p>
            <img src={arrowRight} alt="arrow-right" className="h-6 pl-1"></img>
          </button>
        </a>
        <hr className="border-gray-400 my-2"></hr>
        <a
          href="https://techxplore.com/news/2024-03-team-blockchain-based-method-personal.html"
          rel="noreferrer"
          target="_blank"
        >
          <button className="flex items-center hover:brightness-0 duration-200 pt-2">
            <p className="regular text-gray-600 text-sm text-left">
              Team develops blockchain-based method to protect personal data on
              the internet
            </p>
            <img src={arrowRight} alt="arrow-right" className="h-6 pl-1"></img>
          </button>
        </a>
        <hr className="border-gray-400 my-2"></hr>
        <a
          href="https://news.bitcoin.com/wu-tangs-ghostface-killah-to-release-exclusive-music-collection-on-bitcoin-blockchain/"
          rel="noreferrer"
          target="_blank"
        >
          <button className="flex items-center hover:brightness-0 duration-200 pt-2">
            <p className="regular text-gray-600 text-sm text-left">
              Wu-Tang's Ghostface Killah to Release Music Collection on Bitcoin
              Blockchain
            </p>
            <img src={arrowRight} alt="arrow-right" className="h-6 pl-1"></img>
          </button>
        </a>
      </div>
    </div>
  );
};

export default News;
