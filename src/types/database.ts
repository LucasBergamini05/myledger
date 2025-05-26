/* eslint-disable perfectionist/sort-modules */
import { categorias, contas, transacoes } from '@prisma/client';

export type TAccount = contas;
export type TCategory = categorias;
export type TTransaction = transacoes;

export type TCompleteAccount = { transacoes: TTransaction[] } & TAccount;
