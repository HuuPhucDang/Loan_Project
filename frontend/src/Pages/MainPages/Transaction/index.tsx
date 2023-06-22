import React from 'react';
import {
  Typography,
  Grid,
  Stack,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { UserLayout } from '@/Components/DefaultLayout';
import { StocksChart } from '@/Components/LayoutParts';
import VolatilityTable from './VolatilityTable';
import CoinValueTable from './CoinValueTable';
import MyInvoiceTable from './MyInvoiceTable';
import StaticHeader from './StaticHeader';
import TradeField from './TradeField';
import FooterCoin from './FooterCoin';
import { ROUTERS } from '../../../Constants';
import { Utils } from '@/Libs';

const volatilityHeaderHeight = 33;
const centerVolatilityRow = 40;
const volatilityItemHeight = 19;
const partElementHeight = 147;

const Transaction: React.FC = () => {
  // Constructors
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const volatilityRef = React.useRef<HTMLDivElement | null>(null);
  const [volatilityItemsPerCategory, setVolatilityItemsPerCategory] =
    React.useState<number>(0);
  const [isPortrait, setIsPortrait] = React.useState<boolean>(true);
  const [clientHeight, setClientHeight] = React.useState<number>(0);

  const token = Utils.getAccessToken();

  React.useEffect(() => {
    const symbol = query.get('symbol');
    if (!symbol) Utils.replace(`${ROUTERS.TRANSACTION}?symbol=BTCUSDT`);

    const handleWindowSize = () => {
      setClientHeight(window.innerHeight - 10);
      if (volatilityRef && volatilityRef.current) {
        const { innerWidth, innerHeight } = window;
        setIsPortrait(innerWidth < innerHeight);
        const clientHeight = isMd ? 440 : innerHeight - partElementHeight;
        const resolveHeight =
          clientHeight - volatilityHeaderHeight - centerVolatilityRow;
        const eachCategoryHeight = resolveHeight / 2;
        const isLargeThanHalf = eachCategoryHeight % volatilityItemHeight > 0.5;
        const itemPerCategory = isLargeThanHalf
          ? Math.ceil(eachCategoryHeight / volatilityItemHeight)
          : Math.floor(eachCategoryHeight / volatilityItemHeight);
        setVolatilityItemsPerCategory(itemPerCategory - 1);
      }
    };
    window.addEventListener('load', handleWindowSize);
    window.addEventListener('resize', handleWindowSize);
    handleWindowSize();
    return () => {
      window.removeEventListener('load', handleWindowSize);
      window.removeEventListener('resize', handleWindowSize);
    };
  }, []);

  console.log(clientHeight);

  const _renderLeftSection = () => {
    return (
      <Stack direction="column" height="100%">
        <Box
          borderLeft="1px solid #BBAEAE"
          borderBottom="1px solid #BBAEAE"
          height="67px"
        >
          <StaticHeader symbol={query.get('symbol') || 'BTCUSDT'} />
        </Box>
        <Stack flex={1} sx={{ borderLeft: '0.5px solid #BBAEAE' }}>
          <Grid container height="100%">
            <Grid
              item
              xs={12}
              md={3.1}
              order={{ md: 1, xs: 2 }}
              borderRight="1px solid #ccc"
              padding="0"
              ref={volatilityRef}
            >
              <VolatilityTable
                itemsPerCategory={volatilityItemsPerCategory}
                symbol={query.get('symbol') || 'BTCUSDT'}
              />
            </Grid>
            <Grid item xs={12} md={8.9} order={{ md: 2, xs: 1 }}>
              <Stack direction="column" height="100%">
                <Stack
                  sx={{
                    width: 1,
                    maxWidth: '100%',
                    // flex: 1,
                    background: '#000',
                    height: {
                      xs: token ? '350px' : 'calc(350px + 244px)',
                      sm: token
                        ? `${clientHeight - partElementHeight - 245}px`
                        : `${clientHeight - partElementHeight - 35}px`,
                    },
                  }}
                >
                  <StocksChart symbol={query.get('symbol') || 'BTCUSDT'} />
                </Stack>
                <Stack
                  display={{
                    xs: 'flex',
                    md: 'none',
                  }}
                  direction="column"
                  flex={1}
                  minHeight="150px"
                  maxHeight={{
                    xs: token ? 'calc(100vh - 484px)' : 'calc(100vh - 275px)',
                    md: token ? 'calc(100vh - 480px)' : 'calc(100vh - 271px)',
                    lg: token ? 'calc(100vh - 474px)' : 'calc(100vh - 265px)',
                  }}
                  borderBottom="1px solid #ccc"
                >
                  <Typography
                    sx={{
                      fontSize: '11px',
                      fontWeight: 500,
                      textAlign: 'center',
                      lineHeight: '13px',
                      my: 1,
                    }}
                  >
                    Giao dịch của tôi
                  </Typography>
                  <MyInvoiceTable />
                </Stack>
                <Stack
                  padding="5px"
                  sx={{
                    width: 1,
                    '& .MuiInputBase-root:before': {
                      borderBottom: 0,
                    },
                  }}
                >
                  <Grid container columnSpacing={1}>
                    <TradeField symbol={query.get('symbol') || 'BTCUSDT'} />
                  </Grid>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    );
  };

  const _renderRightSection = () => {
    return (
      <Stack
        direction="column"
        maxHeight={{
          xs: '100%',
          md: 'calc(100vh - 114px)',
        }}
      >
        <Stack
          direction="column"
          flex={1}
          borderBottom="1px solid #ccc"
          sx={{ maxHeight: '370px' }}
        >
          <CoinValueTable />
        </Stack>
        <Stack
          direction="column"
          flex={1}
          minHeight="300px"
          display={{
            xs: 'none',
            md: 'flex',
          }}
          maxHeight={{
            xs: 'calc(100vh - 484px)',
            md: 'calc(100vh - 480px)',
            lg: 'calc(100vh - 474px)',
          }}
        >
          <Typography
            sx={{
              fontSize: '11px',
              fontWeight: 500,
              textAlign: 'center',
              lineHeight: '13px',
              my: 1,
            }}
          >
            Giao dịch của tôi
          </Typography>
          <MyInvoiceTable />
        </Stack>
      </Stack>
    );
  };

  const renderMain = () => {
    return (
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          overflowX: 'hidden',
          // overflowY: 'hidden',
          mx: 'auto',
          height: '100%',
          maxHeight: {
            xs: '100%',
            md: isPortrait ? 'calc(100vh - 40px)' : '100%',
          },
          overflowY: {
            xs: 'auto',
            md: 'hidden',
          },
          maxWidth: '971px',
        }}
      >
        <Grid
          container
          display="flex"
          borderTop="1px solid #BBAEAE"
          borderBottom="1px solid #BBAEAE"
          height={{
            xs: 'auto',
            md: 'calc(100vh - 84px)',
          }}
        >
          <Grid
            item
            xs={12}
            md={9.2}
            height={{
              xs: 'auto',
              md: '100%',
            }}
          >
            {_renderLeftSection()}
          </Grid>
          <Grid
            item
            xs={12}
            md={2.8}
            borderLeft="1px solid #BBAEAE"
            borderRight="1px solid #BBAEAE"
            height={{
              xs: 'auto',
              md: '100%',
            }}
          >
            {_renderRightSection()}
          </Grid>
        </Grid>
        <FooterCoin />
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Giao dịch" />;
};

export default Transaction;
