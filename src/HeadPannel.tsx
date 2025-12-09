import './styles/HeadPannel.scss';

interface HeadPannelProps {
    balance: number;
    showCreator: () => void;
}

function HeadPannel({ balance, showCreator }: HeadPannelProps) {
    return (
        <header className='header'>
            <div className='header__balance-wrapper'>
              <span className='header__balance'>Balance</span>
              <span>${balance}</span>
            </div>
            <button className='header__addCamp' onClick={showCreator}>Add new</button>
        </header>
    )
}

export default HeadPannel;