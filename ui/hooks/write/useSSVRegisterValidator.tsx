import {
    usePrepareContractWrite,
    useContractWrite,
  } from "wagmi";
  import SSVNetwork from "../../utils/SSVNetwork.json";
  
  export function useSSVRegisterValidator() {
    // TODO: query params from backend
    const payload = [
        '0xaf24ab4b4d1f617e7e3a6a495938f2d8c11ab1a25460230a6964011c281697d7dcebb3cb87ce85745ffe7a7d136c5aa2',
        [42, 2, 9, 83],
        [
          "0x8c1c58fbf29354fcb3d3206fa41e648b87f00d853fa4e5b79aca3964038f40485bdf2537de4253165710f87eedfc58ce",
          "0x9023db36abb7dc2aac394404773f6e4cc9acb921a7a909d315261298b25f5b5cd062a5c12280efb6d04fd363f3d666a0",
          "0xb87324004f96236b9c920cb18aef4abfa717638ed2c0daefe7cc37418209c6efab04f2597b2ab5af6cc04183828c3531",
          "0x873db21b470eadc4c9e7adc758b17973da972e434006132046bddd0d23530178bed0ba7791bbc9a9699a241021cffcee"
        ],
        [
          "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001584e3745624176753942483569777a6f5a3674686e376b5038575969396d4233756f3273422f46704c512b6243493943522f5549637737655241706561706d466f664d797974677266387a41514143786b565a304a734a2b5a6b704137417a7844574833747a616c39526274584c484773334b314a77513036443338693658516659626a4a7877526430512f714e4c6f69776a32612f454133784c50586e546c4d55717377636e39314a78302b41377a4341704f7036564f416462704c7432745331776c4341757a347953334b49346d754e444d4c58316a74375763477345724151596d654655426b7576745253714c6e6e5745634569546f58577652787249655079496d7148524f73794f3670464a57387374346666416c5470326a5a4934726162775a6e6c664c33317652523054396f32574d6779344e4d436351536c306b3254793658726a554d62312f545061387956474143513d3d0000000000000000",
          "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000158647156743771306f36394461597031797034432f786a537342554f315065664f4c49542b746f51497570734a4e755543615467393767324e76393061634f3662374650546863595a6949736a55666571693344747a752f31316f46475741744f692b574f316561584e69357a524a66396f584a5a494b6d4d565862456e53336f39456a563471376343302b5045714850655056684d614b5570792b77316d6651346765414769456f4238615a4b4e416a6d42704436543169443546567033376c6a6c58453961776c5a3569687868466e73774373687a52377434356f72346b335a665777503159505270393446724772794c467a6f32646a77656366347261666966665a447046502f466135722b45416b657a496367707676475a51327a36355579764a536b30705a377a2f4742456734534f67754b347349524b2f5576717564336b6d78704256626a34556b4a733254626c5843513d3d0000000000000000",
          "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000015865614d614e355a55496743487347636e707a2b4a6b5652566b31536a6f77546d37355457767366477177636974767651725169622b755a6962315155662f6837576b4b5448727134394d35394d7a50525648552f526376364d6677514b3549705470356d61387953584f715853504a7a4a34335a4f4c2b785051794a676152515777514b7154447931345252684b47384961615651595236694d496c2f586244676d424e41434a614438305678767734522b7079513234414c324f6f414b696f334853575070367477745179695256337959795458566e776a4c3347724e566a72754a32597074665a317235646679373550666e615a73482b4c55675142536535433871364d43574166314d4341684f656d793148523444666b4331625866465a6b35523758446454674b346131346f78366e4469474954594d546730575467482b4637496b4842796272323371346b3979507652773d3d0000000000000000",
          "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001586244315a79504b525569502f6c493375433430736d30434c2f3859574972365831313669736f4a78424453723543732f756c6c41596c457a415a426832304544386e74396e66327651677333415a564e5a337878456950494c6a32683749436665486137623668625970373461476f6732586176393871316567366f45723242465074722f4f4849434a4e37544d31414a5261592b5a6a2b6f622b61666842717a4673635063476777463375455a2b4d68456d4a4c33536c4f474334784a6449763878455178354a7472756d31684a447432476b724c724242756242543944645368414742422f38546e474e594a67556259413648566b3444684e616472685a5771376f6e4c343365304a73372f7a7837547435674e72517170563050466d5670303230666a56502b427248736759347a7859734352352f7242384d4f394f7857714e637036594b6b426a79636249704461456459773d3d0000000000000000"
        ],
        1000000000
    ];  
    const contractAddr = "0xb9e155e65B5c4D66df28Da8E9a0957f06F11Bc04";
  
    const { config } = usePrepareContractWrite({
      address: contractAddr,
      abi: SSVNetwork.abi,
      functionName: 'registerValidator',
      args: payload,
    })
    // debugger;
    const { data, isLoading, isSuccess, write } = useContractWrite(config)
    console.log(data)
    console.log(write)
  
    return { data, isLoading, isSuccess, write };
}