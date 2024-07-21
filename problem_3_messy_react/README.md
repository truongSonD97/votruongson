List the computational inefficiencies and anti-patterns :
- the WalletBalance missing blockchain property that is used in "sortedBalances"
- the FormattedWalletBalance interface can be extend from WalletBalance
- the switch-case statement in getPriority can be replace be finding property in object. If we have a large blockchain, the switch-case maybe be take a lot of lines 
- the lhsPriority value is used without defined and it should be "balancePriority"
- we can optimize the filter and sort in "sortedBalances" to make it pretty
- the function call to return "sortedBalances" variable doesn't use the "prices" variable, so there is wrong to add this on useMemo dependencies
- the "formattedBalances" should be wrapped by useMemo to avoid re-call function
- The "balance" type in "rows" mapping is set to "FormattedWalletBalance", but it should be WalletBalance.
- The "rows" is used in correct variable, they should be "formattedBalances.map" because the WalletRow uses "formatted"