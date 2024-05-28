import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';

export function DialogPay({
	open,
	setOpen,
}: {
	open?: boolean;
	setOpen?: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Comprar consultas</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Comprar consultas</DialogTitle>
					<DialogDescription>comprar mas consultas</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<Button type="submit">Mercado Pago</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}