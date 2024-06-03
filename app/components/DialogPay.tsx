'use client';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

import { mercadopayment } from '../lib/actions';
import { useFormState } from 'react-dom';

export function DialogPay() {
	const [state, dispatch] = useFormState(mercadopayment, { message: null });

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Comprar consultas</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Comprar consultas</DialogTitle>
					<DialogDescription>comprar mas consultas</DialogDescription>
				</DialogHeader>
				<form
					action={dispatch}
					className="flex flex-col gap-8 relative"
				>
					<Select name="cantidad" required>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Selecciona una cantidad" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="1000">
									$1000 - 30 consultas
								</SelectItem>
								<SelectItem value="2000">
									$2000 - 60 consultas
								</SelectItem>
								<SelectItem value="5000">
									$5000 - 200 consultas
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					{state.message && (
						<span className="text-sm text-red-400 absolute top-10 left-2">
							{state.message}
						</span>
					)}
					<Button type="submit">Ir a mercadopago</Button>
				</form>

				<DialogFooter></DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
