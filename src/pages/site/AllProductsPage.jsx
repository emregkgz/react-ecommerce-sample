import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import Link from '@mui/material/Link'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { baseService } from "../../api/baseService";

function AllProductsPage() {

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    function stringToSlug(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to = "aaaaeeeeiiiioooouuuunc------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    }

    const getData = () => {
        baseService.getAll("/products").then((data) => {
            setProducts(data);
        })
    };

    useEffect(() => {
        getData();
    }, [])

    const productDetail = (id, name) => {
        name = stringToSlug(name);
        navigate(`/product/${name}`)
        window.sessionStorage.setItem("product", id);
    }

    const tiers =
        products &&
        products.map((item, key) => {
            return {
                key: key,
                title: item.name,
                id: item.id,
                price: item.unitPrice.toFixed(2),
                stock: item.unitsInStock,
                buttonText: " Detail",
                buttonVariant: "outlined",
                src: `https://picsum.photos/200/200?random=${item.id}`,
            };
        });

    return (<>
        <Container
            disableGutters
            maxWidth="sm"
            component="main"
            sx={{ pt: 8, pb: 6 }}
        >
            <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
            >
                Products
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" component="p">
                Quickly build an effective pricing table for your potential customers with
                this layout. It&apos;s built with default MUI components with little
                customization.
            </Typography>
        </Container>
        <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">
                {tiers.map((tier, key) => (
                    <Grid
                        item
                        key={key}
                        xs={12}
                        sm={tier.title === "Enterprise" ? 12 : 6}
                        md={4}
                        zeroMinWidth
                    >
                        <Link component="button" sx={{ textDecoration: 'none' }}
                            onClick={() => { productDetail(tier.id, tier.title) }}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={tier.src}
                                    alt="Random Image"
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: 'column',
                                            justifyContent: "center",
                                            alignItems: "baseline",
                                            textAlign: "baseline",
                                            height: 150,
                                            width: 230,
                                        }}
                                    >
                                        <Typography
                                            component="h5"
                                            variant="h6"
                                            fontSize="1.05rem"
                                            color="text.primary"
                                            textAlign="start"
                                        >
                                            {tier.title}
                                        </Typography>
                                        <Typography
                                            component="h2"
                                            variant="h4"
                                            color="text.primary"
                                        >
                                            <b>${tier.price}</b>
                                        </Typography>
                                        <Typography
                                            component="h2"
                                            variant="h6"
                                            color="text.primary"
                                        >
                                            Stock: {tier.stock}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </>)
}

export default AllProductsPage