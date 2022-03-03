import BigNumber from 'bignumber.js'
import Button from 'components/Button'
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import CardIcon from 'components/CardIcon'
import IconButton from 'components/IconButton'
import { AddIcon } from 'components/icons'
import Label from 'components/Label'
import Value from 'components/Value'
import { PoolType } from 'contexts/Farms/types'
import useAllowance from 'hooks/useAllowance'
import useApprove from 'hooks/useApprove'
import useModal from 'hooks/useModal'
import useStake from 'hooks/useStake'
import useStakedBalance from 'hooks/useStakedBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import useUnstake from 'hooks/useUnstake'
import React, { useCallback, useState } from 'react'
import { getBalanceNumber } from 'utils/numberFormat'
import { Contract } from 'web3-eth-contract'
import DepositModal from './DepositModal'
import {
	StyledActionSpacer,
	StyledCardActions,
	StyledCardContentInner,
	StyledCardHeader,
} from './styles'
import WithdrawModal from './WithdrawModal'

interface StakeProps {
	lpContract: Contract
	pid: number
	tokenName: string
	poolType: PoolType
}

const Stake: React.FC<StakeProps> = ({
	lpContract,
	pid,
	tokenName,
	poolType,
}) => {
	const [requestedApproval, setRequestedApproval] = useState(false)

	const allowance = useAllowance(lpContract)
	const { onApprove } = useApprove(lpContract)

	const tokenBalance = useTokenBalance(lpContract.options.address)
	const stakedBalance = useStakedBalance(pid)

	const { onStake } = useStake(pid)
	const { onUnstake } = useUnstake(pid)

	const [onPresentDeposit] = useModal(
		<DepositModal
			max={tokenBalance}
			onConfirm={onStake}
			tokenName={tokenName}
		/>,
	)

	const [onPresentWithdraw] = useModal(
		<WithdrawModal
			max={stakedBalance}
			onConfirm={onUnstake}
			tokenName={tokenName}
			pid={pid}
		/>,
	)

	const handleApprove = useCallback(async () => {
		try {
			setRequestedApproval(true)
			const txHash = await onApprove()
			// user rejected tx or didn't go thru
			if (!txHash) {
				setRequestedApproval(false)
			}
		} catch (e) {
			console.log(e)
		}
	}, [onApprove, setRequestedApproval])

	return (
		<Card>
			<CardContent>
				<StyledCardContentInner>
					<StyledCardHeader>
						<CardIcon>🦜</CardIcon>
						<Value value={getBalanceNumber(stakedBalance)} />
						<Label text={`${tokenName} Staked`} />
					</StyledCardHeader>
					<StyledCardActions>
						{!allowance.toNumber() ? (
							<Button
								disabled={requestedApproval}
								onClick={handleApprove}
								text={`Approve ${tokenName}`}
							/>
						) : (
							<>
								<Button
									disabled={stakedBalance.eq(new BigNumber(0))}
									text="Unstake"
									onClick={onPresentWithdraw}
								/>
								<StyledActionSpacer />
								{poolType !== PoolType.ARCHIVED ? (
									<IconButton onClick={onPresentDeposit}>
										<AddIcon />
									</IconButton>
								) : (
									''
								)}
							</>
						)}
					</StyledCardActions>
				</StyledCardContentInner>
			</CardContent>
		</Card>
	)
}

export default Stake
