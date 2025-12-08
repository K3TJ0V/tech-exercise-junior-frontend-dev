import './styles/HeadPannel.scss';

interface HeadPannelProps {
    balance: number;
    showCreator: () => void;
}

function HeadPannel({ balance, showCreator }: HeadPannelProps) {
    return (
        <header className='header'>
            <span className='header__balance'>Balance: ${balance}</span>
            <button className='balance_addCamp' onClick={showCreator}>Add new</button>
        </header>
    )
}

export default HeadPannel;