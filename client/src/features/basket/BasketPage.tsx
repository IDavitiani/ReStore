import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummery from "./BasketSummery";
import { currencyFormat } from "../../app/util/util";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export default function BasketPage() {

    const { basket, status } = useAppSelector(store => store.basket);
    const dispatch = useAppDispatch();

    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Subtotal</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map(item => (
                            <TableRow key={item.productId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center' component={Link} to={`/catalog/${item.productId}`}>
                                        <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">{currencyFormat(item.price)}</TableCell>
                                <TableCell align="center">

                                    <LoadingButton
                                        loading={
                                            status === ('pendingRemoveItem' +
                                                item.productId +
                                                'rem'
                                            )}
                                        onClick={() =>
                                            dispatch(
                                                removeBasketItemAsync({
                                                    productId: item.productId,
                                                    quantity: 1,
                                                    name: 'rem'
                                                }))}
                                        color='error'>
                                        <Remove />
                                    </LoadingButton>

                                    {item.quantity}

                                    <LoadingButton
                                        loading={
                                            status === ('pendingAddItem' +
                                                item.productId
                                            )}
                                        onClick={() =>
                                            dispatch(
                                                addBasketItemAsync({
                                                    productId: item.productId,
                                                    quantity: 1
                                                }))}
                                        color='secondary'>
                                        <Add />
                                    </LoadingButton>

                                </TableCell>
                                <TableCell align="center">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        loading={
                                            status === (
                                                "pendingRemoveItem" +
                                                item.productId +
                                                'del')}
                                        onClick={() =>
                                            dispatch(
                                                removeBasketItemAsync({
                                                    productId: item.productId,
                                                    quantity: item.quantity,
                                                    name: 'del'
                                                }))}
                                        color='error'>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummery />
                    <Button
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid >
        </>
    )

}