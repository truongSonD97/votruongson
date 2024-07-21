

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Assuming 'blockchain' field is present in WalletBalance
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

export const BLOCKCHAINS_PRIORITY = {
    'Osmosis': 100,
    'Ethereum': 50,
    'Arbitrum': 30
    //... so on
}

const getPriority = (blockchain: string): number => {
  return BLOCKCHAINS_PRIORITY[blockchain] ?? -99
};

const WalletPage: React.FC<Props> = ({ children, ...rest }: Props) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      });
  }, [balances]);

  const formattedBalances = useMemo(() =>  sortedBalances.map((balance: WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed()
    })), [sortedBalances]);

  const rows = useMemo(() =>  formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className="row" // Assuming you have a CSS class named "row"
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    }), [formattedBalances, prices]);

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
