'use client';
import * as Yup from 'yup';
import Link from 'next/link';
import React from 'react';
import SectionComponent from '@/components/SectionComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { authService } from '@/services/auth-service';
import { fetchUserRequest } from '@/store/user/user-actions';

const Login: React.FC = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Email inválido').required('Email é obrigatório'),
			password: Yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória')
		}),
		onSubmit: async (values, { setSubmitting }) => {
			await authService
				.login({ email: values.email, password: values.password })
				.then(() => {
					dispatch(fetchUserRequest());
					router.push('/');
				})
				.catch(() => {
					toast.error('Unauthorized!');
				})
				.finally(() => setSubmitting(false));
		}
	});

	return (
		<div className="relative flex flex-col flex-grow overflow-y-auto">
			<div className="flex-grow">
				<SectionComponent className="sm:max-w-sm mx-auto">
					<h1>Login</h1>
					<form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email
							</label>
							<Input
								id="email"
								name="email"
								type="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder="Email"
							/>
							{formik.touched.email && formik.errors.email ? <div className="text-red-500 text-xs ms-1">{formik.errors.email}</div> : null}
						</div>
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Senha (mínimo 6 caracteres)
							</label>
							<Input
								id="password"
								name="password"
								type="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder="Senha"
							/>
							{formik.touched.password && formik.errors.password ? (
								<div className="text-red-500 text-xs ms-1">{formik.errors.password}</div>
							) : null}
						</div>
						<Button type="submit" title="Login" disabled={formik.isSubmitting || !formik.isValid}>
							{formik.isSubmitting ? 'Logando...' : 'Login'}
						</Button>
						<Link className="w-fit mx-auto" href="/create-account">
							Criar Conta
						</Link>
					</form>
				</SectionComponent>
			</div>
		</div>
	);
};

export default Login;
