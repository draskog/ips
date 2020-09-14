<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Storage;

class EmptyCodesFolder extends Command {

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'delete:codes';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Empty codes directory';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $files = Storage::disk('public')->allFiles();
        Storage::disk('public')->delete($files);
        $this->info('All files are deleted!');
    }
}
