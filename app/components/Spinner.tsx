import { SVGProps } from 'react';

export function SvgSpinners3DotsBounce(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<circle cx="4" cy="12" r="3" fill="#888888">
				<animate
					id="svgSpinners3DotsBounce0"
					attributeName="cy"
					begin="0;svgSpinners3DotsBounce1.end+0.25s"
					calcMode="spline"
					dur="0.6s"
					keySplines=".33,.66,.66,1;.33,0,.66,.33"
					values="12;6;12"
				></animate>
			</circle>
			<circle cx="12" cy="12" r="3" fill="#888888">
				<animate
					attributeName="cy"
					begin="svgSpinners3DotsBounce0.begin+0.1s"
					calcMode="spline"
					dur="0.6s"
					keySplines=".33,.66,.66,1;.33,0,.66,.33"
					values="12;6;12"
				></animate>
			</circle>
			<circle cx="20" cy="12" r="3" fill="#888888">
				<animate
					id="svgSpinners3DotsBounce1"
					attributeName="cy"
					begin="svgSpinners3DotsBounce0.begin+0.2s"
					calcMode="spline"
					dur="0.6s"
					keySplines=".33,.66,.66,1;.33,0,.66,.33"
					values="12;6;12"
				></animate>
			</circle>
		</svg>
	);
}
