/** biome-ignore-all lint/performance/noImgElement: img is required for this to work */
import { rabbitImagesCount, rabbitImagesPathPrefix } from "@/data/constants";
import useProgressiveImages from "@/hooks/useProgressiveImage";

const imageData = [...Array(rabbitImagesCount)].map((_, i) => {
	const index = i + 1;
	
	return {
		lowQualitySrc: `${rabbitImagesPathPrefix}${index}-low.webp`,
		highQualitySrc: `${rabbitImagesPathPrefix}${index}.webp`,
	};
});

export default function Rabbit() {
	const progressiveImages = useProgressiveImages(imageData);

	return (
		<div className="p-10 max-w-7xl mx-auto">
			<h1 className="my-4 mt-10 font-bold sm:mx-4 flex justify-between text-4xl items-center mb-10">
				<span>
					My Rabbit, Pallino
					<br />
					<span className="text-lg font-normal">R.I.P. Pallino, August 1, 2013 &mdash; July 14, 2025 :(</span>
				</span>

				<button 
					type="button"
					className="btn btn-soft btn-accent"
					onClick={() => {
						const url = new URL(window.location.href);

						url.searchParams.set("page", "home");

						window.history.replaceState(null, "", url);
					}}
				>
					<span className="icon-[tabler--arrow-back] size-5" /> Back
				</button>
			</h1>

			<div className="sm:mx-4 flex justify-center items-center ">
				<div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
					{progressiveImages.map(({ src, blur }, i) => (
						<div
							key={src}
							className="mb-4 w-full break-inside-avoid rounded-2xl overflow-hidden shadow-lg"
						>
							<img
								// biome-ignore lint/a11y/noRedundantAlt: idk how else describe it without "picture" or "image"
								alt={`Pallino picture number ${i + 1}`}
								src={src}
								className={`h-full w-full object-cover transition-[filter] ease-out duration-300 ${blur ? "blur-md" : ""}`}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
